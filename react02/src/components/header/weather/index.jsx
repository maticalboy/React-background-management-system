import React from 'react'
import './index.css'
export default function Weather(props) {
    // console.log('weather', props.weather[0])
    if (props.weather[0] === '太阳雨')
        return (
            <div className="icon sun-shower">
                <div className="cloud"></div>
                <div className="sun">
                    <div className="rays"></div>
                </div>
                <div className="rain"></div>
            </div>
        )
    else if (props.weather[0] === '雷雨') {
        return (
            <div className="icon thunder-storm">
                <div className="cloud"></div>
                <div className="lightning">
                    <div className="bolt"></div>
                    <div className="bolt"></div>
                </div>
            </div>
        )
    }
    else if (props.weather[0] === '多云') {
        return (
            <div className="icon cloudy">
                <div className="cloud"></div>
                <div className="cloud"></div>
            </div>

        )
    }
    else if (props.weather[0] === '雪') {
        return (
            <div className="icon flurries">
                <div className="cloud"></div>
                <div className="snow">
                    <div className="flake"></div>
                    <div className="flake"></div>
                </div>
            </div>

        )
    }
    else if (props.weather[0] === '晴') {
        return (
            <div className="icon sunny">
                <div className="sun">
                    <div className="rays"></div>
                </div>
            </div>

        )
    }
    else if(props.weather[0]==='阴'||props.weather[0]==='小雨'){
        return (
            <div className="icon rainy">
                <div className="cloud"></div>
                <div className="rain"></div>
            </div>
        )
    }
}
