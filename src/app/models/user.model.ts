import { Serializable } from "./serializable.model";

export class User implements Serializable {
	private _id: number;
	private _name: string;
	private _permissions: Array<string>;

	public static newInstance(): User {
		return new User(40, "guest");
	}

	constructor(
		id: number,
		name: string,
		permissions: Array<string> = []
	) {
		this._id = id;
		this._name = name;
		this._permissions = permissions;
	}

	deserialize(input: any) {
		if (typeof input === "string") {
			input = JSON.parse(input);
		}

		if (typeof input === "object") {
			Object.assign(this, input);
		}

		return this;
	}

	serialize(): string {
		return JSON.stringify(this);
	}

	isGuest(): boolean {
		return this._id === 40;
	}

	/**
	 * Checks if the user has all permissions passed.
	 * @param permissions Array aus Berechtigungs-Strings
	 */
	public hasPermissions(permissions: Array<string>): boolean {
		if (permissions === undefined) {
			return true;
		}

		let errorFlag = false;
		permissions.forEach(b => {
			if (this._permissions.indexOf(b) < 0) {
				errorFlag = true;
			}
		});
		return !errorFlag;
	}

	get permissions(): Array<string>{
		return this._permissions;
	}
	set permissions(value: Array<string>){
		this._permissions = value;
	}
	public addPermission(value: string){
		this._permissions.push(value);
	}

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}
}
