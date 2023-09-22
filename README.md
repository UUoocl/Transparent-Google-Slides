# Transparent-Google-Slides
A javaScript app to play Google Slides with a transparent background and connect to OBS to control scene changes. 

This is an Electron Fiddle app that removes the background from a Published Google Slide show.  
## New features
 **Teleprompter slide notes**. Your slide notes scroll, like a teleprompter.  
![image](https://github.com/UUoocl/Transparent-Google-Slides/assets/99063397/49959c88-9bd9-4865-8de3-d101856ee812)

Adjust the text size and scroll speed. 
|Action      |Key      |
|:-----|:-----|
|⏪Slowdown/reverse scrolling      |F8|
|⏸️Pause scrolling      |F9     |
|⏩Speed up scrolling      |F10      |
|➕Increase notes text size      | =   |
|➖Decrease notes text size      |-     |

**Send and Receive WebSocket messages from the OBS Plug-in Advanced Scene Switcher**.
Messages to Advanced scene switcher can be encoded in the slide notes.  Double pipe characters are used to indicate the start and end of a message.  For example, ||Turn on Luma Filter||, will send the message "Turn on Luma Filter".  Advanced Scene Switcher macro

![image](https://github.com/UUoocl/Transparent-Google-Slides/assets/99063397/a2fbc51c-286d-4f37-8bc7-582d8fd9e67e)

Transparent Google Slides can recieve the following from messages: Next, Previous, Notes Zoom In, Notes Zoom Out, Notes Scroll Faster, Notes-Scroll-Slower

It also uses OBS WebSockets to change scenes in OBS based on the slide notes.  

**Camera background**
Use a camera as a video background to the transparent slides.  Combine this feature with Zoom screen sharing to make a creative presentations. 

## Using this app

### Set the Slides background color

In Google Slides set the background color to #ABCDEF.  The script looks for the color code #ABCDEF when removing the background. 

### Add notes

Double brackets "{{ }}" are used to indicate which Scene to switch too. For Example, add the note {{Scene 1}} to switch to an OBS scene named "Scene 1". 

Other text can be in the notes section. The brackets can appear any where in the notes. 

### Publish the Slides

To Publish your slides, click 'file --> Share --> Publish to web'

### Turn on WebSocket Server in OBS

### [Download this app](https://github.com/UUoocl/Transparent-Google-Slides/releases/tag/0.0.1-alpha)



