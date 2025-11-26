import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  relativeDate = 'a day ago',
  productImage = 'https://img.freepik.com/free-psd/floating-white-sneaker-minimalist-shoe-design_191095-80028.jpg',
  productLink = '#',
  settingsValue = {
    showOnMobile: true,
    position: 'bottom-left',
    hideTimeAgo: false,
    truncateProductName: false,
    hideCustomerName: false,
    hideCloseButton: false
  },
  onClose = () => {}
}) => {
  const finalLink = productLink || '#';

  return (
    <div className={`Avava-SP__Wrapper Avava-SP__Wrapper--${settingsValue.position}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          {!settingsValue.hideCloseButton && (
            <button
              className="Avava-SP__CloseButton"
              onClick={onClose}
              aria-label="Close notification"
            >
              ×
            </button>
          )}
          <a href={finalLink} className="Avava-SP__LinkWrapper">
            <div className="Avava-SP__Image" style={{backgroundImage: `url(${productImage})`}} />

            <div className="Avada-SP__Content">
              <div
                className={`Avada-SP__Title ${
                  settingsValue.truncateProductName ? 'Avada-SP__Title--truncate' : ''
                }`}
              >
                {settingsValue.hideCustomerName ? 'Something' : firstName} in {city}, {country}
              </div>

              <div
                className={`Avada-SP__Subtitle ${
                  settingsValue.truncateProductName ? 'Avada-SP__Subtitle--truncate' : ''
                }`}
              >
                purchased {productName}
              </div>

              <div
                className={`Avada-SP__Footer ${settingsValue.hideTimeAgo ? 'hide-timeago' : ''}`}
              >
                {!settingsValue.hideTimeAgo && <span>{relativeDate}</span>}
                <span className="uni-blue">
                  <i className="fa fa-check" /> by Avada
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
  relativeDate: PropTypes.string,
  productImage: PropTypes.string,
  productLink: PropTypes.string,
  settingsValue: PropTypes.shape({
    showOnMobile: PropTypes.bool,
    position: PropTypes.string,
    hideTimeAgo: PropTypes.bool,
    truncateProductName: PropTypes.bool,
    hideCustomerName: PropTypes.bool,
    hideCloseButton: PropTypes.bool
  }),
  onClose: PropTypes.func
};

export default NotificationPopup;
