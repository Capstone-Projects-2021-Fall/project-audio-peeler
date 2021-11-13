from pydub import AudioSegment
from mutagen.mp3 import MP3
# class AudioDivider():
#     def __init__(self, URL) -> None:
#         self.url = URL
#         self.fileLocation = []

#         self.audio = AudioSegment.from_wav(self.url)

#     #get the duration of the song
#     def get_duration(self):
#         return self.audio.duration_seconds

#     def get_each_duration(self):
#         return self.get_duration()/4

#     def single_split(self,from_time, to_time, split_file_name):
#         t1 = from_time * 1000
#         t2 = to_time * 1000
#         split_audio = self.audio[t1:t2]
#         # target_dict = '/Users/yangbo/Documents/audio_peeler' # need change location
#         # current_file = split_audio.export(target_dict + '/' + split_file_name, format="wav")
#         current_file = split_audio.export(split_file_name, format="wav")
#         self.fileLocation.append(current_file)

#     def multiple_split(self):
#         each_length = self.get_each_duration()
#         for i in range(4):
#             split_file_name = str(i) + ".wav"
#             from_time = i * each_length
#             to_time = from_time + each_length
#             self.single_split(from_time,to_time,split_file_name)
#             print(split_file_name + " finished splitting")
#         print("all done")

#         for i in range(len(self.fileLocation)):
#             print(self.fileLocation[i].name + '\n')
        
#         return self.fileLocation

class AudioDivider():
    def __init__(self, URL) -> None:
        self.url = URL
        self.fileLocation = []

        self.audio = AudioSegment.from_mp3(self.url)
        self.mp3 = MP3(self.url)

    #get the duration of the song
    def get_duration(self):
        return self.mp3.info.length

    def get_each_duration(self):
        return self.get_duration()/4

    def single_split(self,from_time, to_time, split_file_name):
        t1 = from_time * 1000
        t2 = to_time * 1000
        split_audio = self.audio[t1:t2]
        # current_file = split_audio.export(split_file_name, format="mp3")
        # self.fileLocation.append(current_file)
        self.fileLocation.append(split_audio.export(split_file_name, format="mp3"))


    def multiple_split(self):
        each_length = self.get_each_duration()
        for i in range(4):
            split_file_name = str(i) + ".mp3"
            from_time = i * each_length
            to_time = from_time + each_length
            self.single_split(from_time,to_time,split_file_name)
            print(split_file_name + " finished splitting")
        print("all done")

        for i in range(len(self.fileLocation)):
            print(self.fileLocation[i].name + '\n')
        
        return self.fileLocation

# Now can only support .wav file.
    

    