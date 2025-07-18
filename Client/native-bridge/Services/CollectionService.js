import { BaseService } from "../Infrastructure/BaseService.js";
import { FileSystemService } from "./FileSystemService.js";


export class CollectionService extends BaseService {
    constructor() {
        super();

        /** @type {FileSystemService} */
        this.fileSystemService;

        this.InjectDependencies({
            fileSystemService: BaseService.getInstance(FileSystemService)
        });
    }

}