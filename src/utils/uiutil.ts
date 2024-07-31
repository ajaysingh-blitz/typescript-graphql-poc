
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

export function getScaffold(body: JSON) {
    scaffold.args.body = body
    console.log(`scaffold = ${JSON.stringify(scaffold)}`);
    return scaffold;
}

export function getTextView(title: String) {
    text.args.text = title
    console.log(`text = ${JSON.stringify(text)}`);
    return text;
}

export function getColumn(children: JSON[]) {
    column.args.children = children
    console.log(`column = ${JSON.stringify(column)}`);
    return column;
}


export function getContainer(height: Number, width: Number, child: JSON) {
    container.args.height = height
    container.args.width = width
    container.args.child = child
    console.log(`container = ${JSON.stringify(container)}`);
    return container;
}

export function getListView(children: JSON[]) {
    list_view.args.children = children
    console.log(`column = ${JSON.stringify(list_view)}`);
    return list_view;
}

export function getNetworkImage(srcUrl: String) {
    network_image.args.src = srcUrl
    return network_image;
}

export function getPadding(left: Number = 12, right: Number = 12, top: Number = 12, bottom: Number = 12 ) {
    padding.padding.left = left
    padding.padding.right  = right
    padding.padding.top = top
    padding.padding.botttom = bottom
    return padding;
}

export function getRow(children: JSON[]) {
    row.args.children = children
    console.log(`row = ${JSON.stringify(row)}`);
    return row;
}
