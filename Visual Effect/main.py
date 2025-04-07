import tensorflow as tf # deeplearning library
import numpy as np
from functools import partial
import PIL.Image # image loading and saving
import urllib.request # for downloading file from internet 
import os
import zipfile
import matplotlib.pyplot as plt
from io import BytesIO # handles byte streams 
import scipy.ndimage as nd # for image resizing 

# Disable TensorFlow 2.x behaviors to stay compatible with TF 1.x code
tf.compat.v1.disable_eager_execution()


# Downloads the pretrained Inception model from Google's servers
# This model is trained on ImageNet and will be used to generate DeepDream images
def download_inception_model(store_data, url):
    model_name = os.path.split(url)[-1]
    zip_file = os.path.join(store_data, model_name)

    if not os.path.exists(zip_file):
        model_url = urllib.request.urlopen(url)
        with open(zip_file, 'wb') as output:
            output.write(model_url.read())

        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            zip_ref.extractall(store_data)

    return os.path.join(store_data, 'tensorflow_inception_graph.pb')


def T(layer_name):
    """Helper to get layer output tensor"""
    return graph.get_tensor_by_name("import/%s:0" % layer_name)


def resize(img, size):
    """Resize image using scipy"""
    return nd.zoom(img, (float(size[0]) / img.shape[0], float(size[1]) / img.shape[1], 1), order=1)


def calc_grad_tiled(img, t_grad, tile_size=512):
    """Calculate gradients over tiles to avoid memory issues"""
    h, w = img.shape[:2]
    sx = np.random.randint(tile_size)
    sy = np.random.randint(tile_size)
    img_shift = np.roll(np.roll(img, sx, 1), sy, 0)
    grad = np.zeros_like(img)

    for y in range(0, max(h - tile_size // 2, tile_size), tile_size):
        for x in range(0, max(w - tile_size // 2, tile_size), tile_size):
            sub = img_shift[y:y+tile_size, x:x+tile_size]
            feed_dict = {t_input: sub}
            g = sess.run(t_grad, feed_dict=feed_dict)
            grad[y:y+tile_size, x:x+tile_size] = g

    return np.roll(np.roll(grad, -sx, 1), -sy, 0)


def save_image(img, filename):
    """Save the image to a file"""
    img_to_save = np.uint8(np.clip(img, 0, 1) * 255)
    PIL.Image.fromarray(img_to_save).save(filename)
    print(f"Saved image to {filename}")


def render_deepdream(t_obj, img0, iter_n=50, step=1.5, octave_n=4, octave_scale=1.4, save_path=None):
    t_score = tf.reduce_mean(t_obj)
    t_grad = tf.gradients(t_score, t_input)[0]

    # Make a copy of the original image to avoid modifying it
    img = img0.copy()
    octaves = []

    for _ in range(octave_n - 1):
        hw = img.shape[:2]
        lo = resize(img, np.int32(np.float32(hw) / octave_scale))
        hi = img - resize(lo, hw)
        img = lo
        octaves.append(hi)

    for octave in range(octave_n):
        if octave > 0:
            hi = octaves[-octave]
            img = resize(img, hi.shape[:2]) + hi

        for _ in range(iter_n):
            g = calc_grad_tiled(img, t_grad)
            img += g * (step / (np.abs(g).mean() + 1e-7))

    # Display the image
    result_img = img / 255.0
    plt.figure(figsize=(10, 10))
    plt.imshow(np.uint8(np.clip(result_img, 0, 1) * 255))
    plt.axis('off')
    plt.title(f"DeepDream with {iter_n} iterations")
    plt.show()
    
    # Save the image if a save path is provided
    if save_path:
        save_image(result_img, save_path)
    
    return img


def main():
    global graph, sess, t_input, layer  # So helper functions can access these
    url = "https://storage.googleapis.com/download.tensorflow.org/models/inception5h.zip"
    store_data = r"LOCAL STORAGE "  # You might need to change this path
    
    # Create output directory if it doesn't exist
    output_dir = os.path.join(store_data, "deepdream_output")
    os.makedirs(output_dir, exist_ok=True)

    model_path = download_inception_model(store_data, url)

    graph = tf.Graph()
    with graph.as_default():
        sess = tf.compat.v1.InteractiveSession()
        with tf.io.gfile.GFile(model_path, 'rb') as f:
            graph_def = tf.compat.v1.GraphDef()
            graph_def.ParseFromString(f.read())

        t_input = tf.compat.v1.placeholder(np.float32, name='input')
        imagenet_mean = 117.0
        t_preprocessed = tf.expand_dims(t_input - imagenet_mean, 0)
        tf.import_graph_def(graph_def, {'input': t_preprocessed})

        # Debug: list layers
        layers = [op.name for op in graph.get_operations() if op.type == 'Conv2D' and 'import/' in op.name]
        feature_nums = [int(graph.get_tensor_by_name(name + ':0').get_shape()[-1]) for name in layers]

        print('Number Of Layers:', len(layers))
        print('Total Number Of Feature Channels:', sum(feature_nums))

        # Select a layer and channel
        layer = 'mixed4d_3x3_bottleneck_pre_relu'  # Adjust this if needed
        channel = 139

        # Load input image
        img_path = 'tpug.jpg'  # Make sure this file exists
        try:
            img0 = PIL.Image.open(img_path)
            img0 = np.float32(img0)
        except Exception as e:
            print(f"Error loading image: {e}")
            print("Please make sure 'tpug.jpg' exists in the current directory.")
            return

        # Save the original image
        save_image(img0/255.0, os.path.join(output_dir, "original.jpg"))
        
        # Create and save DeepDream images with different iteration counts
        iterations = [10, 50, 100]
        
        for iter_n in iterations:
            print(f"\nRunning DeepDream with {iter_n} iterations...")
            output_path = os.path.join(output_dir, f"deepdream_iter{iter_n}.jpg")
            render_deepdream(T(layer)[:, :, :, channel], img0, iter_n=iter_n, save_path=output_path)


if __name__ == "__main__":
    main()