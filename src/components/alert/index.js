import { toast } from 'vue3-toastify';
import IAlert from '@/components/alert/i-alert.vue';

export default function IAlertFunction (props) {
  console.log(props)
  toast(IAlert, {
    contentProps: {
      message: props.message,
      type: props.type,
      showIcon: props.showIcon
    },
    type: props.type,
    autoClose: props.autoClose,
    closeButton: props.showCloseButton,
    transition: toast.TRANSITIONS.SLIDE,
    closeOnClick: false,
    hideProgressBar: true,
    icon: false
  });
}