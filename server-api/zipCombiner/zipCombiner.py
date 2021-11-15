from logging import currentframe
from pydub import AudioSegment
import zipfile
import zlib

class zipCombiner:
    def __init__(self, zip_files) -> None:
        #zip_list = ['0.zip','1.zip','2.zip',3.zip]
        zip_files = sorted(zip_files)
        self.target_files = ['bass.wav','drums.wav','vocals.wav','other.wav']

        self.zip_files = zip_files

    def audio_combine(self,target_index):
        audio_list = []
        
        #put all the audio files to audio_list
        for i in range(len(self.zip_files)):
            current_zip = self.zip_files[i]
            zipFile = zipfile.ZipFile(current_zip)
            audio = AudioSegment.from_wav(zipFile.open(self.target_files[target_index]))
            audio_list.append(audio)

        combined_audio = AudioSegment.empty()

        for i in range(len(audio_list)):
            combined_audio = combined_audio + audio_list[i]

        return combined_audio
        
    def muti_combine(self):
        audio_list = []
        print("Start combining")
        for i in range(len(self.target_files)):
            current_audio = self.audio_combine(i)
            audio_list.append(current_audio)
        
        return audio_list

            
        

        
    