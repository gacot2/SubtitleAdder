"""
This class will take the audio from the video and 
create an audio file with it

*We are not using this class curently
"""

from moviepy.editor import *


class FromVideoToAudio:
    def __init__(self):
        self.video = VideoFileClip(
            "FromSpeechToSubtitle\speech\backend\client\video.mp4")

    def getVideo(self):
        return self.video

    def createAudio(self, videoPath):

        # 1.0 get the video
        my_clip = VideoFileClip(
            videoPath)

        # 1.1 convert the video to audio
        cli = my_clip.audio.write_audiofile(
            r"FromSpeechToSubtitle\speech\backend\AudioFromVideo\resultMono.wav")
