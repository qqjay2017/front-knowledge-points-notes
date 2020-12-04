import React from 'react';
import styles from './index.less';

import { history} from 'umi'

export default () => {
  return (
    <div className={styles.title}>
      <h1 >Page home</h1>
      <button onClick={()=>history.push('/list')}>goList</button>
    </div>
  );
}
