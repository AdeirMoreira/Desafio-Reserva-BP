import { Portuguese } from 'flatpickr/dist/l10n/pt.js'



function notify(object: any, title: string,  text: string, color: string) {
    object.notify({
        position: "top-center",
        title,
        text,
        color
    });
}

export default  {
    notifySuccess(object: object, text: string, title: string = 'Atenção') {
        notify(object, title, text, 'success')
    },
    notifyFail(object: object, text: string, title: string = 'Atenção') {
        notify(object, title, text, 'danger')
    },
}

export function formatDatePtBR(stringData: string) {
    let [data, hora] = stringData.split("T");
    data = data.split("-").reverse().join("/");
    hora = hora.slice(0, 5);

    return data + " " + hora;
  }
