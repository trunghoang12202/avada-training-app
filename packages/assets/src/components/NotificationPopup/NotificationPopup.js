import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'https://img.freepik.com/free-psd/floating-white-sneaker-minimalist-shoe-design_191095-80028.jpg?semt=ais_hybrid&w=740&q=80',
  settingsValue = {
    showOnMobile: true,
    position: 'bottom-left',
    hideTimeAgo: false,
    truncateProductName: false
  },
  isMobile = false,
  isAbsolute = false
}) => {
  return (
    <div
      className={`Avava-SP__Wrapper Avava-SP__Wrapper--${settingsValue.position} ${
        isMobile ? 'is-mobile' : ''
      } ${isAbsolute ? 'is-absolute' : ''}`}
    >
      <div className={`Avava-SP__Inner`}>
        <div className="Avava-SP__Container">
          <a href="#" className="Avava-SP__LinkWrapper">
            <div
              className="Avava-SP__Image"
              style={{backgroundImage: `url(${productImage})`}}
            ></div>

            <div className="Avada-SP__Content">
              <div
                className={`Avada-SP__Title ${
                  isMobile || settingsValue.truncateProductName ? 'Avada-SP__Title--truncate' : ''
                } `}
              >
                {`${firstName} in ${city}, ${country}`}
              </div>

              <div
                className={`Avada-SP__Subtitle ${
                  isMobile || settingsValue.truncateProductName
                    ? 'Avada-SP__Subtitle--truncate'
                    : ''
                } `}
              >
                purchased {productName}
              </div>

              <div
                className={`Avada-SP__Footer ${settingsValue.hideTimeAgo ? 'hide-timeago' : ''}`}
              >
                {!settingsValue.hideTimeAgo && <span>{timestamp}</span>}

                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.string,
  productImage: PropTypes.string,
  settingsValue: PropTypes.object,
  isMobile: PropTypes.bool,
  isAbsolute: PropTypes.bool
};

export default NotificationPopup;
