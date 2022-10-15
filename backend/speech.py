"""
Main file of the python backend

1. Extract the audio from a video
2. Extract the txt from the audio
3. Add the text to the initial video
"""

from moviepy.editor import *
from audioExtractorVosk import AudioExtractorVosk
from VideoEditor import VideoEditor

__author__ = "Gabriel Côté"
__version__ = "1.0."
__email__ = "gabrielcote1999@gmail.com"
__status__ = "prototype"


def main():
    """
    1. from video to audio
    """

    # 1.0 get the video
    my_clip = VideoFileClip(
        "./client/video.mp4")

    # 1.1 convert the video to audio
    cli = my_clip.audio.write_audiofile(
        "./AudioFromVideo/resultMono.wav")
    # print(cli)

    """
    2. From audio to text
    """
    WORD = AudioExtractorVosk().main()

    """
    3. from text to subtitles
    """
    videoEditor = VideoEditor()

    videoEditor.main(WORD)


main()
