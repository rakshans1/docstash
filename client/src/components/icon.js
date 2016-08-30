import React, {PropTypes} from 'react';

class Icon extends React.Component {
  render() {
    switch(this.props.type) {
      //Logo
      case 'logo':
      return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="30pt" height="30pt" viewBox="0 0 262.000000 295.000000"
         preserveAspectRatio="xMidYMid meet">
        <g  className="docstash" transform="translate(0.000000,295.000000) scale(0.100000,-0.100000)"
        stroke="none">
        <path  d="M1454 2900 c-175 -46 -330 -170 -410 -327 -14 -29 -29 -53 -33 -53
        -3 0 -28 7 -56 16 -60 18 -185 20 -246 4 -117 -31 -231 -122 -288 -230 -37
        -69 -65 -189 -57 -241 6 -36 5 -37 -40 -49 -61 -17 -152 -77 -187 -123 -104
        -137 -114 -319 -25 -460 38 -60 97 -108 174 -144 53 -25 73 -28 187 -31 l127
        -4 0 -77 c0 -42 5 -94 11 -116 17 -60 64 -121 117 -152 44 -26 55 -28 185 -31
        l138 -4 -3 -196 -3 -197 -57 -87 c-56 -86 -58 -88 -97 -88 -71 0 -132 -77
        -115 -146 26 -107 149 -139 221 -60 38 41 44 93 17 149 -16 33 -16 34 29 104
        83 130 77 88 77 518 l0 385 95 0 95 0 0 -472 0 -473 -29 -17 c-91 -51 -85
        -189 9 -228 81 -34 180 27 180 110 0 53 -23 96 -60 115 l-30 16 0 474 0 475
        95 0 95 0 0 -392 0 -393 59 -94 59 -95 -19 -24 c-44 -57 -29 -144 33 -182 62
        -38 141 -19 178 43 50 81 -6 187 -98 187 -25 0 -35 10 -85 91 l-57 91 0 294 0
        294 108 0 c67 0 128 6 158 15 62 18 124 70 149 124 18 41 18 41 74 41 201 1
        391 143 451 339 72 232 -41 492 -257 588 l-62 28 -1 80 c0 170 -60 307 -189
        435 -98 98 -170 140 -287 170 -99 26 -233 26 -330 0z m368 -83 c239 -92 394
        -330 375 -577 l-6 -76 48 -13 c61 -15 161 -81 200 -130 115 -145 132 -322 46
        -480 -33 -60 -114 -140 -173 -170 -52 -27 -145 -51 -194 -51 l-38 0 0 150 c0
        147 1 151 23 159 62 24 94 109 63 168 -52 102 -194 96 -235 -11 -21 -54 0
        -112 52 -145 l37 -24 0 -149 0 -148 -190 0 -190 0 0 453 0 452 29 17 c42 23
        66 65 65 113 -2 76 -55 125 -135 125 -35 0 -48 -6 -80 -39 -33 -32 -39 -45
        -39 -80 0 -54 22 -97 60 -116 l30 -16 0 -454 0 -455 -95 0 -95 0 0 48 c0 42 3
        48 28 59 81 36 82 176 2 218 -61 31 -152 8 -181 -47 -31 -58 -5 -144 52 -174
        25 -13 29 -20 29 -59 l0 -45 -95 0 -95 0 0 288 0 289 25 11 c58 27 82 119 46
        178 -20 32 -74 64 -110 64 -40 0 -90 -28 -111 -62 -38 -63 -19 -138 45 -178
        l35 -22 0 -284 0 -284 -190 0 -190 0 0 63 c1 59 2 63 33 82 18 11 41 36 51 56
        50 92 -45 201 -151 175 -14 -4 -41 -22 -60 -41 -27 -27 -33 -41 -33 -74 0 -54
        22 -97 60 -116 29 -15 30 -18 30 -81 l0 -66 -118 4 c-104 3 -126 7 -174 31
        -65 32 -131 99 -161 165 -31 67 -30 198 2 263 49 103 140 172 246 187 l47 7 1
        115 c2 104 5 121 30 173 35 70 105 143 172 179 101 54 251 56 354 5 57 -29 57
        -29 89 50 66 164 209 291 382 338 88 24 267 15 352 -18z m-772 -1717 l0 -160
        -102 0 c-119 0 -165 11 -208 47 -48 40 -63 78 -68 180 l-5 93 192 0 191 0 0
        -160z m950 154 c0 -18 -47 -67 -80 -84 -33 -17 -59 -20 -160 -20 l-120 0 0 55
        0 55 180 0 c99 0 180 -3 180 -6z"/>
        </g>
        </svg>
      );

      //Auth Icons
      case 'circle_error':
      return (
        <svg viewBox="0 0 20 20">
        <path d="M10,0.982c4.973,0,9.018,4.046,9.018,9.018S14.973,19.018,10,19.018S0.982,14.973,0.982,10
          S5.027,0.982,10,0.982 M10,0C4.477,0,0,4.477,0,10c0,5.523,4.477,10,10,10s10-4.477,10-10C20,4.477,15.523,0,10,0L10,0z M9,5.703
          V5.441h2.5v0.262l-0.66,5.779H9.66L9,5.703z M9.44,12.951h1.621v1.491H9.44V12.951z"/>
        </svg>
      );
      case 'circle_tick':
        return (
          <svg viewBox="0 0 23 23">
          <path d="M11.5,23C5.2,23,0,17.8,0,11.5S5.2,0,11.5,0S23,5.2,23,11.5S17.8,23,11.5,23z M11.5,1C5.7,1,1,5.7,1,11.5S5.7,22,11.5,22
            S22,17.3,22,11.5S17.3,1,11.5,1z M10.4,15.2l6.7-7c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L10,14.2L7,11
            c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7l3.4,3.5c0.1,0.1,0.2,0.1,0.3,0.1S10.3,15.3,10.4,15.2z"/>
          </svg>
        );

      case 'circle_tick_filled':
        return (
          <svg viewBox="0 0 20 20">
            <path fill="#4FB07F" d="M9.5,0C14.7,0,19,4.3,19,9.5S14.7,19,9.5,19S0,14.7,0,9.5S4.3,0,9.5,0z"/>
            <path fill="#FFFFFF" d="M8.7,12.9c-0.1,0-0.2,0-0.3-0.1l-2.4-2.5c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0L8.7,12l4.6-5
              c0.1-0.1,0.4-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5L9,12.8C9,12.8,8.9,12.9,8.7,12.9C8.8,12.9,8.8,12.9,8.7,12.9z"/>
          </svg>
        );

      case 'guthub':
        return (
          <svg viewBox="0 0 34 34">
          <path fillRule="evenodd" clipRule="evenodd" fill="#191717" d="M32.6,16.3c0,7.2-4.7,13.3-11.1,15.5c-0.8,0.2-1.1-0.3-1.1-0.8
            c0-0.5,0-2.3,0-4.5c0-1.5-0.5-2.5-1.1-3c3.6-0.4,7.4-1.8,7.4-8c0-1.8-0.6-3.2-1.7-4.4c0.2-0.4,0.7-2.1-0.2-4.3c0,0-1.4-0.4-4.5,1.7
            c-1.3-0.4-2.7-0.5-4.1-0.5c-1.4,0-2.8,0.2-4.1,0.5C9.1,6.3,7.7,6.8,7.7,6.8C6.8,9,7.4,10.7,7.6,11.1c-1,1.1-1.7,2.6-1.7,4.4
            c0,6.2,3.8,7.6,7.4,8.1c-0.5,0.4-0.9,1.1-1,2.2c-0.9,0.4-3.3,1.1-4.7-1.4c0,0-0.9-1.6-2.5-1.7c0,0-1.6,0-0.1,1c0,0,1.1,0.5,1.8,2.4
            c0,0,1,3.2,5.5,2.2c0,1.4,0,2.4,0,2.8c0,0.4-0.3,0.9-1.1,0.8C4.7,29.6,0,23.5,0,16.3C0,7.3,7.3,0,16.3,0C25.3,0,32.6,7.3,32.6,16.3z
            "/>
          </svg>
        );
      default:
          return false;
    }
  }
}
Icon.propTypes = {
  type: PropTypes.string.isRequired
};
export default Icon;