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