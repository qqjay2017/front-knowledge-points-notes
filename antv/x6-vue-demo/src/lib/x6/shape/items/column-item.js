/**
 * @author huang
 * @date 2021/01/19
 * @description 表字段
 */


export default (X6) => {
    try {
      X6.registerNode(
        'column-item',
        {
          width: 220,
          height: 320,
          markup: [
            {
              tagName: 'rect',
              attrs: {
                class: 'item',
              },
            },
  
            {
              tagName: 'text',
              attrs: {
                class: 'item-title',
              },
            },
        
        
          
          ],
          attrs: {
            '.item': {
           
              refWidth: '100%',
              refHeight: '100%',
              fill: '#666',
              //   stroke: '#ccc',
              strokeWidth: 0,
             
            },
            '.item-title': {
              refX: 0.5,
              refY: 10,
              fontSize: 14,
              textAnchor: 'middle',
              textVerticalAnchor: 'top',
            },
          
          },
        },
        true,
      )
  
    } catch (error) {
      console.log(error)
    }
  
  }