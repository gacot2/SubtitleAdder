"""
This file adds subtitles to a video

1. Extract the audio from a video
2. Extract the txt from the audio
3. Add the text to the initial video
"""

import moviepy.editor as mp

__author__ = "Gabriel Côté"
__version__ = "1.0."
__email__ = "gabrielcote1999@gmail.com"
__status__ = "prototype"


class VideoEditor:
    def __init__(self):
        """
        self.wordDic
        self.fontSize
        self.textColor
        self.position
        self.lenght
        """

    def videoEditing(self, wordDic, fontSize, textColor, position, font):
        """
        This function takes the dictionary of the words and other parameters for the 
        styling of the subtitles and create the new video

        the words added are sentences
        """
        txt_clips = []
        # for all the words in the dic
        for index in range(len(wordDic)-1):

            txt_clip = mp.TextClip(
                wordDic[index]['word'], font=font, fontsize=fontSize, color=textColor)
            duration = wordDic[index]["duration"]
            start = int(wordDic[index]['start'])
            # define the start of every set of word
            txt_clip = txt_clip.set_start(start)
            # define the position and the duration of every set word
            txt_clip = txt_clip.set_pos(position).set_duration(duration)
            # add the subtitles to the video
            txt_clips.append(txt_clip)

        return txt_clips

    def setSet(self, word, lenght):
        """
        This function takes as an input a list of words and the desired lenght
        of each sentences showing on the screen

        1. we initialise the start of the sentence to the one of the first word
        2. we add each words in the sentence until the desired "lenght" aka duration is met
        3. we repeat the process for all the words in the initial set

        """
        # initial parameters
        pointer = 0
        duration = 0
        newSet = []
        newString = ""
        sentencePointer = 0
        numberOfWords = len(word)-1

        # while we are not at the end of the list
        while pointer < numberOfWords:
            # 2 seconds intervals
            while duration < lenght and pointer < numberOfWords:
                # get the start of the new set
                if sentencePointer == 0:
                    start = word[pointer]['start']

                # the duration of a sentence
                # it is the timestamps of the last word - time of the first one
                duration = word[pointer]['end'] - start
                # composition of the new string
                newString = newString + " " + word[pointer]['word']
                pointer += 1
                sentencePointer += 1

            # start, end, duration and composition of the sentence
            newString = {"start": start,
                         "end": word[pointer]['end'], "word": newString, "duration": duration}
            # we add this sentence to the dic of sentences
            newSet.append(newString)

            # reset the parameters for the next sentence
            duration = 0
            sentencePointer = 0
            newString = ""

        return newSet

    def main(self, words):

        # set the variable to the initial video
        my_video = mp.VideoFileClip(
            "./client/video.mp4", audio=True)

        w, h = moviesize = my_video.size

        # creation of the videoEditor object
        videoEditor = VideoEditor()

        # build the new list of words with the good lenght of sentences in minutes
        words = videoEditor.setSet(words, 2)

        # do the video editing
        txt_clips = videoEditor.videoEditing(
            words, 20, 'yellow', 'bottom', 'Mongolian-Baiti')

        # add the subtitles to the video
        final = mp.CompositeVideoClip(
            [my_video, *txt_clips])

        # return the final clip and save it to the result folder
        final.subclip(0).write_videofile(
            "./result/Final.mp4", fps=24, codec='libx264')

    if __name__ == "__main__":
        main()
