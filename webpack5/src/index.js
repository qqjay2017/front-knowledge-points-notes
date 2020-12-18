import   './index.css'
import './style.less'
import './style.scss'
import time from './timg.jpg'

const div = document.createElement('div')
div.innerText="webpack5"


document.getElementById('root').appendChild(div)



const img = new Image()
img.src=time
document.getElementById('root').appendChild(img)