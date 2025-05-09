import style from './Skeleton.module.css'
export default function SkeletonCardLoader() {
    return (
      <div className={style["card-loader-container"]}>
      {
        [1,2,3,4,5,6].map((i, key)=>(
            <div key={key} className={style['card-loader']}></div>
        ))
      }
        
      </div>
    );
  }