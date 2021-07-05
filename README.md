# DiscogsUpload
Upload releases to your Discogs Collection

This small program can be run to upload releases to your Discogs Collection.
Download the executable (Mac, Windows, Linux) to a folder and create a file releases.txt with the following line:
- first line = Discogs username
- second line = Discogs personal access token (in Discogs Developer settings)
- third line = folder name within your collection
- remaining lines = releases to be added

Due to Discogs limitations, one release is added per second.

Link to executables: https://drive.google.com/drive/folders/1Ov4k6z2bCK5XWiuWrUXuTs5CPoqnHDt8?usp=sharing

Program is writtine with Node and uses this library: https://github.com/bartve/disconnect

