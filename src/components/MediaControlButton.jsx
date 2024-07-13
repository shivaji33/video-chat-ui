const MediaControlButton = (props) => {
  const {children,isEnabled, ...rest} = props;
    return  <button type="button"
    className={`control-item text-white ${isEnabled ? "bg-green-600" : "bg-red-500"}`}
    {...rest}
  >
  {children}
  </button>
}

export default MediaControlButton