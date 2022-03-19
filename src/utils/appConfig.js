import toastr from "toastr"
import styles from './appConfig.module.scss';

toastr.options.positionClass = 'toast-top-center';
toastr.options.hideDuration = 2 * 1000;
toastr.options.timeOut = 2 * 1000;
toastr.options.toastClass = styles['toast-class'];