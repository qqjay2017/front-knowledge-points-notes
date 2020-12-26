import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

console.log(_.join('a', 'b', 'c'));

ReactDom.render(<div>hello</div>, document.getElementById('root'));
