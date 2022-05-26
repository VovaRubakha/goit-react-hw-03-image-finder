import { Component } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
    componentDidMount() {
        document.addEventListener("keydown", this.closeModal)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal)
    }

    closeModal = (e) => {
        const {close} = this.props;
        if (e.code === "Escape") {
            close();
            return;
        }
        if(e.target === e.currentTarget) {
            close();
        }
    }

    render() {
        const { children } = this.props;
        const {closeModal} = this;
        return createPortal(
            <div className={styles.Overlay} onClick={closeModal}>
                <div className={styles.Modal}>
                    {children}
                </div>
            </div>,
            modalRoot,
        )
    }
}


export default Modal;