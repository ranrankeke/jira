import React, { useState, useEffect } from 'react';
import './style.css';
const ReactCarousel = () => {

  // 图片数组
  const imgs = [
    './images/1.png',
    './images/2.png',
    './images/3.png',
    './images/4.png',
    './images/5.png'
  ];
  const [imgData, setImgData] = useState({
    showIndex: 0, //显示第几个图片
    timer: null,  // 定时器
  })
  useEffect(() => {
    start();

  }, [])

  useEffect(() => {
    console.log('showIndex effect', imgData)

  }, [imgData])

  // componentDidMount() { //一开始自动播放
  //   this.start();
  // }
  // componentWillUnmount() { //销毁前清除定时器
  //   this.stop();
  // }

  const start = () => { //开始

    let { timer } = imgData;
    timer = setInterval(() => {
      next();
    }, 2000);
    setImgData(Object.assign(imgData, {
      timer
    }))
  }

  const stop = () => { //暂停
    let { timer } = imgData;
    clearInterval(timer);
  }

  const change = (index) => { //点击下面的按钮切换当前显示的图片
    let { showIndex } = imgData;
    showIndex = index;
    setImgData(Object.assign(imgData, {
      showIndex
    }))
  }
  const previous = (e) => { //上一张
    let ev = e || window.event;
    // let { showIndex } = imgData;
    if (imgData.showIndex <= 0) {
      setImgData(Object.assign(imgData, {
        showIndex: imgs.length - 1
      }))
    } else {
      setImgData(Object.assign(imgData, {
        showIndex: imgData.showIndex--
      }))
    }

  }
  const next = () => { //下一张

    if (imgData.showIndex >= imgs.length - 1) {

      setImgData(Object.assign(imgData, {
        showIndex: 0
      }))

    } else {

      setImgData(Object.assign(imgData, {
        showIndex: imgData.showIndex + 1,
      }))

      console.log('next showIndex', Object.assign(imgData, {
        showIndex: imgData.showIndex + 1,
      }))
    }

  }
  return (
    <div className="ReactCarousel">
      <div className="contain"
        // onMouseEnter={stop} //鼠标进入停止自动播放
        onMouseLeave={start}  //鼠标退出自动播放
      >
        <ul className="ul">
          {
            imgs.map((value, index) => {
              return (
                <li className={index === imgData.showIndex ? 'show' : 'unshow'}
                  key={index}
                >
                  <img src={require(value + '')} alt="轮播图" />
                </li>
              )
            })
          }
        </ul>
        <ul className="dots" style={{ width: imgs.length * 20 + 'px' }}>
          {
            imgs.map((value, index) => {
              return (
                <li key={index}
                  className={index === imgData.showIndex ? 'active' : ''}
                  onClick={() => change(index)}>
                </li>)
            })
          }

        </ul>
        <div className="control">
          <span className="left" onClick={(e) => previous(e)}>左</span>
          <span className="right" onClick={(e) => next(e)}>右</span>
        </div>
      </div>
    </div>
  )
}
export default ReactCarousel;