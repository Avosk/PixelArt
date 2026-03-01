let cur_color = "#000"
let default_color = '#fff'
let fill_mode = false
let is_clicked = false

let color_map = {
  'blue' : '#00f',
  'green' : '#0f0',
  'yellow' : '#0ff',
  'red' : '#f00',
  'purple' : '#f0f'
}
let colors = [
  'rgb(255, 255, 255)', //0-default
  'rgb(0, 0, 255)', //1-blue
  'rgb(0, 255, 0)', //2-green
  'rgb(0, 255, 255)', //3-yellow
  'rgb(255, 0, 0)', //4-red
  'rgb(255, 0, 255)' //5-purple
]

let field = document.querySelector('.field')

const h_field = parseInt(field.getAttribute('data-heigth'))
const w_field = parseInt(field.getAttribute('data-width'))

for (let i=0; i<h_field*w_field; i++)
  {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `${i}`)
    field.appendChild(cell)
  }

document.addEventListener('mousedown', function(){is_clicked = true})
document.addEventListener('mouseup', function(){is_clicked = false})

field.style.gridTemplateColumns = `repeat(${w_field}, 1fr)`
field.style.gridTemplateRows = `repeat(${h_field}, 1fr)`

let cells = document.querySelectorAll('.cell')

for (let id=0; id<cells.length; id++){
  let cell = cells[id]
  cell.addEventListener('click', function(){
    if (!fill_mode){
       cell.style.background = cur_color;
    }
    else{
      cells.forEach(cell_c => {
         cell_c.style.background = cur_color;
      })
}
  })
  cell.addEventListener('mouseover', function(){
    if  (is_clicked){
       if (!fill_mode){
       cell.style.background = cur_color;
    }
    else{
      cells.forEach(cell_c => {
         cell_c.style.background = cur_color;
      })
        }
    }
  })
}

let color_cells = document.querySelectorAll('.color-cell')
color_cells.forEach(color_cell => {
  color_cell.addEventListener('click', function(){
    fill_mode = false
    let color_choose = color_cell.classList[1]
    cur_color = color_map[color_choose]
    document.querySelector('.selected').classList.remove('selected')
    color_cell.classList.add('selected')
    
  })
})

document.querySelector('.eraser').addEventListener('click', function(){
  cur_color = default_color
  fill_mode = false
  document.querySelector('.selected').classList.remove('selected')
   this.classList.add('selected')
})

document.querySelector('.fill').addEventListener('click', function(){
  fill_mode = true
  document.querySelector('.selected').classList.remove('selected')
   this.classList.add('selected')
})

setInterval(function() {
  let result = ''
  let cells_f = document.querySelectorAll('.cell') 
  cells_f.forEach((cell) =>{
    let color = cell.style.backgroundColor;
    let colorIndex = '0'
    for (let i = 0; i<colors.length; i++){
      if (color === colors[i]){
        colorIndex = i.toString();
        //console.log(color, colorIndex)
        break;
      }
    }
    result += colorIndex;
  })
  document.cookie = `pixel-result=${result}; max-age=1000000`
  
}, 10000)

document.querySelector('.save').addEventListener('click', function(){
  domtoimage.toJpeg(field, {quality:2})
    .then(function (dataUrl){
           let img = new Image();
           img.src=dataUrl;
    let link = document.createElement('a');
    link.download = 'pixelArt.jpg'
    link.href = dataUrl;
    link.click();
                                            })
  .catch(function(error){
    console.error('Oops, wrong(', error)
  })
})
