from io import TextIOBase
from AudioDivider.AudioDivider import *


audio_URL = '/Users/yangbo/Documents/audio_peeler/test.mp3'
# audio = MP3(audio_URL)
split_mp3 = AudioDivider(audio_URL)
audio_list = split_mp3.multiple_split()
for i in range(len(audio_list)):
    print(audio_list[i].name)