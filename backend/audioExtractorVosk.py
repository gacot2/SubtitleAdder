"""
Extract the audio from the mp4 files

1. Extract the audio from a video
2. Take the dic for which the confidence is the higher
3. Return an arrays with all the words
    - their start
    - their end
"""


from unittest import result
from vosk import Model, KaldiRecognizer, SetLogLevel
import sys
import os
import wave
import json
from pydub import AudioSegment

__author__ = "Gabriel Côté"
__version__ = "1.0."
__email__ = "gabrielcote1999@gmail.com"
__status__ = "prototype"


class AudioExtractorVosk:

    def __init__(self):
        self.link = 0

    def getHighestConfidence(self, dic):
        """
        takes in a dic from vosk and return the one with
        the highest probability of succes
        """
        conf = 0
        for num in range(len(dic)):
            if conf > int(dic['alternatives'][num]['confidence']):
                dic = dic['alternatives'][num]['confidence']

        return dic

    def getResults(self, dic, list):
        """
        get the results from a part from the text
        """
        for resList in range(len(dic)):
            for res in range(len(dic[resList]['alternatives'][0]['result'])):
                list.append(dic[resList]['alternatives'][0]['result'][res])

        return list

    def main(self):
        # Open the audio
        wf = wave.open(
            "./AudioFromVideo/resultMono.wav", "rb")

        # if the audio file is not in the good format
        # we put it in the good format
        if wf.getnchannels() != 1:
            sound = AudioSegment.from_wav(
                "./AudioFromVideo/resultMono.wav")
            sound = sound.set_channels(1)
            sound.export(
                "./AudioFromVideo/resultMono.wav", format="wav")

        elif wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
            print("Audio file must be WAV format mono PCM.")
            print(wf.getnchannels(), " ",
                  wf.getsampwidth(), " ", wf.getcomptype())
            exit(1)

        # model we are using
        model = Model(r"/Project/pyaudio/vosk-model-fr-0.22")

        # settings
        rec = KaldiRecognizer(model, wf.getframerate())
        rec.SetMaxAlternatives(10)
        rec.SetWords(True)

        results = []
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break

            if rec.AcceptWaveform(data):
                results.append(rec.Result())

        results.append(rec.FinalResult())
        """
        Load all the dics in a list
        """
        sets = []
        for elem in range(len(results)):
            dic = json.loads(results[elem])
            sets.append(dic)
        confidenceSet = []

        # we take the words with the highest confidence
        for result in range(len(sets)):
            sett = self.getHighestConfidence(sets[result])
            confidenceSet.append(sett)

        finalSet = []
        confidenceSet = self.getResults(confidenceSet, finalSet)

        return finalSet

    if __name__ == "__main__":

        main()
