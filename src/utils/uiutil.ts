
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
    return page;
}

export function getScaffold(body: JSON) {
    return {
        ...scaffold,
        args : {
            ...scaffold.args,
            body : {
                body : body
            }
        }
    }
    //scaffold.args.body = body
}

export function getTextView(title: String) {
    return {
        ...text,
        args : {
            ...text.args,
            text : title
        }
    }
}

export function getColumn(children: JSON[]) {
    return {
        ...column,
        args : {
            ...column.args,
            children : children
        }
    }
   // column.args.children = children
}


export function getContainer(height: Number, width: Number, child: JSON) {
    
    return {
        ...container,
        args : {
            ...container.args,
            height : height,
            width : width,
            child : child
        }
    }
    

    // container.args.height = height
    // container.args.width = width
    // container.args.child = child
    // console.log(`container = ${JSON.stringify(container)}`);
    // return container;
}

export function getListView(scrollDirection: String, children: JSON[]) {
    return {
        ...list_view,
        args : {
            ...list_view.args,
            scrollDirection : scrollDirection,
            children : children
        }
    }
    // list_view.args.scrollDirection = scrollDirection
    // list_view.args.children = children
    // console.log(`column = ${JSON.stringify(list_view)}`);
    // return list_view;
}

export function getNetworkImage(srcUrl: String) {
   return {
    ...network_image,
    args : {
        ...network_image.args,
        srcUrl : srcUrl
    }
   }

    // network_image.args.src = srcUrl
    // return network_image;
}

export function getPadding(left: Number, right: Number, top: Number, bottom: Number, child: JSON) {
   return {
    ...padding, 
    args : {
        ...padding.args,
        padding : {
          left: left,
          right: right,
          top: top,
          bottom: bottom
        },
        child : child
    }
   } 


    // padding.args.padding.left = left
    // padding.args.padding.right  = right
    // padding.args.padding.top = top
    // padding.args.padding.bottom = bottom
    // padding.args.child = child
    // return padding;
}

export function getRow(children: JSON[]) {
    return {
        ...row, 
        args : {
            ...row.args,
            children : children
        }
    }
    // row.args.children = children
    // console.log(`row = ${JSON.stringify(row)}`);
    // return row;
}
