import moduls from "./modulePlan.json"
export default class NodeService {

    getTreeNodes() {
        return moduls.root;
    }

}