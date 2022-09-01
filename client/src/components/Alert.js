
export default function Altert(props) {
  return (
    <div style={{ height: "60px" }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{props.alert.type === "success" ? "Success" : "Error"}: </strong> {props.alert.msg}
        </div>
      )}
    </div>
  );
}