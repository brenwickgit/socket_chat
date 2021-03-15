//Global Dependencies
const express = require('express');
const path = require('path');

//Constants
const app = express();


//-----------------------------------------SERVER--------------------------------------------------//

//Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})


const PORT = process.env.PORT || 5000;

//Port listening
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
