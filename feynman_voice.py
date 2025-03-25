from TTS.api import TTS

# Load the pre-trained model for voice cloning
model_name = "tts_models/multilingual/multi-dataset/your_tts"

def load_model():
    print("Loading the voice cloning model...")
    tts = TTS(model_name=model_name, progress_bar=True)
    return tts

def clone_voice(input_text, output_path="static/audio/output.wav", reference_audio_path="static/audio/input.wav"):
    print("Cloning voice...")
    tts = load_model()
    # Synthesize speech using the reference audio directly for voice cloning
    wav = tts.tts_to_file(text=input_text, speaker_wav=reference_audio_path, language='en', file_path=output_path)

    # Save output to a file
    # sf.write(output_path, wav, samplerate=22050)
    # print(f"Cloned voice saved to {output_path}")

# if __name__ == "__main__":
#     tts = load_model()

#     # Define the input text to clone
#     text_to_synthesize = ""

#     # Path to the reference voice (replace this with your reference audio file)
#     reference_audio = "Final/static/audio/input.wav"

#     # Output path where cloned audio will be saved
#     output_audio = "test_output.wav"

#     # Perform voice cloning
#     clone_voice(tts, text_to_synthesize, reference_audio, output_audio)
