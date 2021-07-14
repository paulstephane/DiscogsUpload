# DiscogsUpload
Upload releases to your Discogs Collection

This small program can be run to upload releases to your Discogs Collection.
Download the executable (Mac, Windows, Linux) to a folder and create a text file "releases.txt" (saved within the same folder) with the following data:
- first line = Discogs username
- second line = Discogs personal access token (in Discogs Developer settings)
- third line = folder name within your collection
- remaining lines = releases to be added

Due to Discogs limitations, one release is added per second.

The program reads the folder content on Discogs and only adds releases that are not already included in the folder.

Link to executables: https://drive.google.com/drive/folders/1Ov4k6z2bCK5XWiuWrUXuTs5CPoqnHDt8?usp=sharing

Program is written with Node and uses this library: https://github.com/bartve/disconnect

