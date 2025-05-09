import { toast } from 'vue3-toastify';
import IAlertComponent from '@/components/alert/i-alert-component.vue';

export default function IAlert (props) {
  toast(IAlertComponent, {
    contentProps: {
      message: props.message,
      type: props.type,
      showIcon: props.showIcon
    },
    expandCustomProps: true,
    type: props.type,
    autoClose: props.autoClose,
    closeButton: props.showCloseButton,
    transition: toast.TRANSITIONS.SLIDE,
    closeOnClick: false,
    hideProgressBar: true,
    icon: false
  });
}