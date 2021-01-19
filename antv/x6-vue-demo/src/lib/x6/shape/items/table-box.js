/**
 * @author huang
 * @date 2021/01/18
 * @description 右边的大node
 */


export default (X6) => {
  try {
    X6.registerNode(
      'table-box',
      {
        width: 100,
        height: 40,
        
        markup: [
          {
            tagName: 'rect',
            attrs: {
              class: 'card',
            },
          },
          {
            tagName: 'rect',
            attrs: {
              class: 'titleRect',
            },
          },

          {
            tagName: 'rect',
            attrs: {
              class: 'btnRect',
            },

          },

          {
            tagName: 'text',
            attrs: {
              class: 'title',
            },
          },

          {
            tagName: 'g',
            attrs: {
              class: 'btn add',

            },
            children: [
              {
                tagName: 'circle',
                attrs: {
                  class: 'add',
                },
              },
              {
                tagName: 'text',
                attrs: {
                  class: 'add',
                },
              },
            ],
          },
          {
            tagName: 'rect',
            attrs: {
              class: 'columnListRect',
            },
           
          },
          {
            tagName: 'g',
            attrs: {
              class: 'columnListRect',
              width: 80,
              height: 40,
              'pointer-events': 'visiblePainted',
            },
            children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((id) => {
              return {
                tagName: 'rect',
                attrs: {
                  class: `column-item-${id}`,
                  
                },
              }
            })
          }
         


        ],
        attrs: {
        
          '.card': {

            refWidth: '100%',
            height:320,
            fill: '#666',
            //   stroke: '#ccc',
            strokeWidth: 0,

          },
          '.titleRect': {

            refWidth: 1,
            height: 36,
            fill: '#ccc',
            //   stroke: '#ccc',
            strokeWidth: 0,
          },
          '.columnListRect': {
            refWidth: 1,
            fill: '#fff',
            refX: 0,
            refY: 66,
            refHeight: 100,
            // refHeight2: -66,
 
          },
          '.title': {
            refX: 0.5,
            refY: 10,
            fontSize: 14,
            textAnchor: 'middle',
            textVerticalAnchor: 'top',
          },
          '.btnRect': {
            refWidth: 1,
            refX: 0,
            refY: 36,
            height: 30,
            fill: '#fff',
            //   stroke: '#ccc',
            strokeWidth: 0,

          },

          '.btn.add': {
            refX: 16,
            refY: 52,
            event: 'node:add',
            zIndex: 9,
            cursor: 'pointer',
          },

          '.btn > circle': {
            r: 10,
            fill: 'transparent',
            stroke: '#333',
            strokeWidth: 1,
          },
          '.btn.add > text': {
            fontSize: 20,
            fontWeight: 800,
            stroke: '#000',
            x: -5.5,
            y: 7,
            fontFamily: 'Times New Roman',
            text: '+',
          },
          '.columnListG': {
            event: 'node:mousewheel',
            refX: 0,
            refY: 52,
           
            refWidth: 0,
            refHeight:0,
            height:0,

          },
          ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].reduce((memo, id) => {
            memo[`.column-item-${id}`] = {
              refX: 0,
              refY: 0+(id-1) * 30,
              text: '534dfgfd',
              fill: '#fff',
              stroke: '#000',
              width: 220,
              height: 30,
              fontSize: 20,
              fontWeight: 800,

            }
            return memo;
          }, {})
        },
      },
      true,
    )

  } catch (error) {
    console.log(error)
  }

}