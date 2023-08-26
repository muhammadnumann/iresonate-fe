import React from 'react'
import useSound from 'use-sound';
import './button.less'


function DollarButtton() {
    const soundUrl = './sound/ClickTipSound.mp3';
    const playbackRate = 1;
    const [isSelected, setIsSelected] = React.useState(false);
    const [play] = useSound(soundUrl, {
        playbackRate,
        volume: 1,
    });
    const handleClick = () => {
        play();
    };

    React.useEffect(() => {

    }, [isSelected])
    return (
        <>
            <div className="button">
                <div className="button_inner q">
                    <button className='border-0 p-0 d-flex bg-transparent flex-column align-items-center gap-1 position-relative dollar-sign'
                        onClick={handleClick}
                        onMouseDown={() => {
                            setIsSelected(true)
                        }}
                        onMouseUp={() => {
                            setTimeout(() => {
                                setIsSelected(false)
                            }, 800)
                        }}
                        onMouseLeave={() => {
                            setIsSelected(false);
                        }}
                    >
                        <div className="img-btn-section" role="img" aria-label="Heart">
                            <div className={`image-with-button d-flex align-items-center justify-content-center h-100`}>
                                <svg className="dol-img" xmlns="http://www.w3.org/2000/svg" width={28} height={51} viewBox="0 0 28 51" fill="none">
                                    <path d="M12.4382 38.3744V26.7489C8.81273 25.7152 6.15356 24.1422 4.46067 22.0448C2.76779 19.9474 1.92134 17.3931 1.92134 14.3969C1.92134 11.4006 2.88014 8.81635 4.79026 6.74893C6.70037 4.68152 9.25468 3.498 12.4382 3.18339V0.434326H16.4607V3.18339C19.4045 3.53545 21.7416 4.53919 23.4794 6.19463C25.2172 7.85006 26.3259 10.0673 26.8127 12.8388L19.794 13.7527C19.367 11.5729 18.2584 10.0898 16.4607 9.31073V20.1647C20.9026 21.3707 23.9288 22.9287 25.5318 24.8388C27.1348 26.7489 27.9438 29.2059 27.9438 32.2096C27.9438 35.5579 26.9326 38.3819 24.9026 40.674C22.8802 42.9662 20.0637 44.3744 16.4532 44.8912V50.0823H12.4307V45.0336C9.23221 44.6441 6.63296 43.453 4.63295 41.453C2.63295 39.453 1.35954 36.6366 0.805237 32.9886L8.04869 32.2096C8.34082 33.6927 8.90262 34.9662 9.71161 36.0373C10.5281 37.1085 11.4345 37.8875 12.4307 38.3669L12.4382 38.3744ZM12.4382 9.23582C11.3446 9.60286 10.4757 10.2321 9.83146 11.1235C9.18726 12.0148 8.85768 12.9961 8.85768 14.0673C8.85768 15.0486 9.14981 15.9624 9.74906 16.8014C10.3408 17.6403 11.2397 18.322 12.4382 18.8388V9.23582ZM16.4607 38.7639C17.8464 38.5017 18.9775 37.865 19.8464 36.8388C20.7154 35.8126 21.1498 34.6066 21.1498 33.2208C21.1498 31.9849 20.7828 30.9137 20.0562 30.0148C19.3221 29.116 18.1311 28.4268 16.4607 27.9474V38.7714V38.7639Z" fill="#1F231F" />
                                </svg>

                            </div>
                        </div>
                    </button>
                    <div className={`b_l_quad position-relative ${isSelected ? '' : 'd-none'}`} style={{ top: '-85px' }}>
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                        <div className="button_spots" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DollarButtton
