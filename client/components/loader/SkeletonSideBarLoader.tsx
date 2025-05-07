import styles from "./Skeleton.module.css"

export default function SkeletonSideBarLoader({
    count = 1,
}) {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles['sidebar-items-loading-main']}>
                    <div className={styles['sidebar-items-loading-round']}></div>
                    {/* <div className={styles['sidebar-items-loading-box']}></div> */}
                </div>
            ))}
        </>
    );
}
