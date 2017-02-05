const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        this.message={fail: "Sorry, but this node doesn't exist"};
    }


    append(data) {
        let node = new Node(data);
        let selectNode = this._head;
        if(selectNode === null){
            this._head = node;
            this._tail = node;
        }
        else{
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        if (this._head === null) {return null;}
        return this._head.data;
    }

    tail() { 
        if (this._tail === null) {return null;}
        return this._tail.data;
    }

    at(index) {
        let count = 1;
        let selectNode = this._head;
        if(this.length === 0 || index < 0 || index >= this.length) {
            throw new Error(this.message.fail);
        }
        while(count <= index){
            selectNode = selectNode.next;
            ++count;
        } 
        return selectNode.data;
    }

    insertAt(index, data) { 
        let node= new Node(data);
        let selectNode = this._head;
        let count = 1;
        if(index < 0 || index > this.length) {
            throw new Error(this.message.fail);
        }
        else { 
            if ((index==0) && (this.length == 0)){
                this._head=node;
                this._tail=node;
            }
            else if(index == 0){
                node.next = this._head;
                this._head.prev = node; 
                this._head = node;
                this.length++; 
            }
            else if(index == this.length){
                node.prev = this._tail;
                this._tail.next=node;
                this._tail=node;
                this.length++;
                return this;
            } 
            else{
                while(count <= index){
                    selectNode = selectNode.next;
                    count++;
                }
                let prevNode = selectNode.prev;
                prevNode.next = node;
                node.prev = prevNode;
                node.next = selectNode;
                selectNode.prev = node;
            }
            this.length++;
        }
        return this;
    }

    isEmpty() {
        if (this.length === 0 ) {
            return true;
        }
        return false;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {

        let selectNode = this._head;
        let count = 1;
        if(index < 0 || index > this.length) {
            throw new Error(this.message.fail);
        }
        else { 
            if((index == 0) && (this.length >1)){
                this._head =this.head.next;
                this._head.prev=null;        
            }
            else if ((index==0) && (this.length == 1)){
                this._head=null;
                this._tail=null;
            }
            else if(index == this.length){
                this._tail=this._tail.prev;
                this._tail.next=null;
            }
            else{ 
                while(count <= index){
                    selectNode = selectNode.next;
                    count++;
                }
                let prevNode = selectNode.prev;
                let nextNode = selectNode.next;
                prevNode.next = nextNode;
                nextNode.prev = prevNode;
                selectNode = null;
            }
            this.length--;
        }
        return this;
    }

    reverse() {
        let count =this.length-1;
        if(this.length <= 0  ) {
            throw new Error(this.message.fail);
        }
        else{
            let selectNode= this._tail;
            while(count){
                let s= selectNode.next;
                selectNode.next=selectNode.prev;
                selectNode.prev= s;
                selectNode=selectNode.next;
                count--;        
            }
            let v = this._tail; 
            this._tail = this._head;
            this._head = v;
        }
        return this;
    }
    indexOf(data) {
        let count = 0;
        let selectNode = this._head;
        while(count<this.length){
            if(selectNode.data == data){
                return count;
            }
            selectNode = selectNode.next;
            count++;
        }
        return -1;
    }
}
module.exports = LinkedList;
