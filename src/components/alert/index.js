import { toast } from 'vue3-toastify';
import IAlertComponent from '@/components/alert/i-alert-component.vue';

export default function IAlert (props, delay) {
  setTimeout(() => {
    toast(IAlertComponent, {
      contentProps: {
        message: props.message,
        type: props.type,
        showIcon: props.showIcon,
      },
      toastClassName: props.autoHeight ? 'auto-height': '',
      type: props.type,
      expandCustomProps: true,
      autoClose: 4000,
      transition: toast.TRANSITIONS.SLIDE,
      closeOnClick: false,
      hideProgressBar: true,
      icon: false,
      ...props,
    });
  }, delay || 0);
}
