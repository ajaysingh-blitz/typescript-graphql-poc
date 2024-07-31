
import page from '@/uicomponents/page.json';
import scaffold from '@/uicomponents/scaffold.json';
import text from '@/uicomponents/text.json';
import column from '@/uicomponents/column.json';
import container from '@/uicomponents/container.json';
import list_view from '@/uicomponents/list_view.json';
import network_image from '@/uicomponents/network_image.json';
import padding from '@/uicomponents/padding.json';
import row from '@/uicomponents/row.json';


export function getPageView() {
    console.log(`page = ${JSON.stringify(page)}`);
    return page;
}

export function getScaffold() {
    console.log(`scaffold = ${JSON.stringify(scaffold)}`);
    return scaffold;
}

export function getTextView(title: String) {
    text.args.text = title
    console.log(`text = ${JSON.stringify(text)}`);
    return text;
}

export function getColumn() {
    console.log(`column = ${JSON.stringify(column)}`);
    return column;
}

export function getContainer() {
    console.log(`container = ${JSON.stringify(container)}`);
    return container;
}

export function getListView() {
    console.log(`list_view = ${JSON.stringify(list_view)}`);
    return list_view;
}

export function getNetworkImage() {
    console.log(`network_image = ${JSON.stringify(network_image)}`);
    return network_image;
}

export function getPadding() {
    console.log(`padding = ${JSON.stringify(padding)}`);
    return padding;
}

export function getRow() {
    console.log(`row = ${JSON.stringify(row)}`);
    return row;
}
