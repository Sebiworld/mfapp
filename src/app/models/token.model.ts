import { Serializable } from "./serializable.model";

export class Token implements Serializable {
	private _string

	constructor(
		token: string
	) {
		this._string = token;
		// TODO: split JWT, to get saved infos
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

	get string(): string {
		return this._string;
	}
}
