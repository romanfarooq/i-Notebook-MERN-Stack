
function Altert(props) {
  return (
    <div style={{ height: "45px" }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{props.alert.type === "success" ? "Success" : "Error"}: </strong> {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Altert;