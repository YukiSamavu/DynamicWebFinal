const canvas = document.getElementById('BarGraph');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 800;

fetch('http://localhost:3000/api').then(res => res.json()).then(graphData => {
    console.log(graphData);
    let NA = graphData.continent['NA']; 
    let SA = graphData.continent['SA'];
    let AS = graphData.continent['AS']; 
    let EU = graphData.continent['EU'];
    let AF = graphData.continent['AF'];
    let AU = graphData.continent['AU'];
    let AN = graphData.continent['AN'];

    let greenColor = graphData.color['green'];
    let blueColor = graphData.color['blue'];
    let pinkColor = graphData.color['pink'];
    let brownColor = graphData.color['brown'];

    let GoFish = graphData.cardgame['Go Fish']; 
    let memory = graphData.cardgame['Memory']; 
    let war = graphData.cardgame['War'];
    let oldMaid = graphData.cardgame['Old Maid'];

ctx.fillStyle = '#FFFFFF';
ctx.font = '20px Arial';

//North America
ctx.fillStyle = '#405';
ctx.fillRect(20, 300, 60, 210 *  (NA));
//South America
//ctx.fillRect(X-axis, Y-axis, width, height)  
ctx.fillStyle = '#8F1834';
ctx.fillRect(100, 150, 60, 210 * (SA));
//Europe
ctx.fillStyle = '#006D9C';
ctx.fillRect(190, 500, 60, 210 * (EU));
//Asia
ctx.fillStyle = '#4DEB92';
ctx.fillRect(280, 300, 60, 210 * (AS)); 
//Africa
ctx.fillStyle = '#BC30FF';
ctx.fillRect(360, 300, 60, 210 * (AF));
//Australia
ctx.fillStyle = '#E5FF21';
ctx.fillRect(450, 300, 60, 210 * (AU));
//Anarctica
ctx.fillStyle = '#ED39D8';
ctx.fillRect(540, 300, 60, 210 * (AN));
//Green
ctx.fillStyle = '#009E37';
ctx.fillRect(635, 210, 60, 170 * (greenColor));
//blue
ctx.fillStyle = '#0000FF';
ctx.fillRect(720, 300, 60, 210 * (blueColor));
//pink
ctx.fillStyle = '#e75480';
ctx.fillRect(800, 300, 60, 210 * (pinkColor));
//brown
ctx.fillStyle = '#964B00';
ctx.fillRect(880, 300, 60, 210 * (brownColor));
//Memory
ctx.fillStyle = '#FFFF00';
ctx.fillRect(970, 500, 60, 210 * (memory));
//War
ctx.fillStyle = '#F0A500';
ctx.fillRect(1050, 500, 60, 210 * (war));
//Old Maid 
ctx.fillStyle = '#F048B4';
ctx.fillRect(1135, 500, 60, 210 * (oldMaid));
//Go Fish
ctx.fillStyle = '#c0c0c0';
ctx.fillRect(1210, 300, 60, 210 * (GoFish));

ctx.fillText('North', 23, 750);
ctx.fillText('America', 10, 770);
ctx.fillText('South', 100, 750);
ctx.fillText('America', 93, 770);
ctx.fillText('Europe', 185, 760);
ctx.fillText('Asia', 290, 760);
ctx.fillText('Africa', 363, 760);
ctx.fillText('Australia', 440, 760);
ctx.fillText('Anarctica', 533, 760);
ctx.fillText('Green', 636, 770);
ctx.fillText('Blue', 728, 760);
ctx.fillText('Pink', 808, 760);
ctx.fillText('Brown', 883, 760);
ctx.fillText('Memory', 963, 760);
ctx.fillText('War', 1060, 760);
ctx.fillText('Old', 1143, 750);
ctx.fillText('Maid', 1140, 770);
ctx.fillText('Go', 1223, 750);
ctx.fillText('Fish', 1220, 770);
ctx.fillText(NA, 40, 690);
ctx.fillText(SA, 120, 690);
ctx.fillText(EU, 210, 690);
ctx.fillText(AS, 305, 690);
ctx.fillText(AF, 385, 690);
ctx.fillText(AU, 480, 690);
ctx.fillText(AN, 570, 690);
ctx.fillText(greenColor, 660, 690);
ctx.fillText(blueColor, 745, 690);
ctx.fillText(pinkColor, 820, 690);
ctx.fillText(brownColor, 905, 690);
ctx.fillText(memory, 990, 690);
ctx.fillText(war, 1070, 690);
ctx.fillText(oldMaid, 1160, 690);
ctx.fillText(GoFish, 1230, 690);
})







