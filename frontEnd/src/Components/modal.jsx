
import './modal.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div id="crud-modal" className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <button className="button-close" type="button" onClick={handleClose}>x</button>
                </div>
                {children}
            </section>
        </div>
    );
};

export default Modal;