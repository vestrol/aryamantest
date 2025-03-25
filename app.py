from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
from texify_code import img_to_tex
from gemini_code import response_give
from feynman_voice import clone_voice
#
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

# Check if folder exists at startup
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/ai')
def ai():
    return render_template('ai.html')


@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        flash('No file part')
        return redirect(url_for('ai'))

    file = request.files['image']
    if file.filename == '':
        flash('No selected file')
        return redirect(url_for('ai'))

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Convert the image to LaTeX
        latex = img_to_tex(filepath)

        def format_feynman_response(text):
            while "**" in text:
                text = text.replace("**","<strong>",1)
                text = text.replace("**","</strong>",1)
            while "*" in text:
                text = text.replace("*","<em>",1)
                text = text.replace("*","</em>",1)
            # formatted = text.replace('**', '<strong>').replace('**', '</strong>')
            # formatted = formatted.replace('*', '<em>').replace('*', '</em>')
            return text.replace('\n\n', '<br><br>')
            
        feynman_response = format_feynman_response(response_give(latex))

        clone_voice(feynman_response)

        # Send the Feynman response to the template
        return render_template('ai.html', prediction=feynman_response,image=filename)

    flash('Invalid file type')
    return redirect(url_for('ai'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
