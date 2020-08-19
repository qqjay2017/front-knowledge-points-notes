import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./index";

export default {
	title: "Button",
	component: Button,
};

export const Text = () => (
	<Button onClick={action("clicked2")}>Hello Button1</Button>
);

export const Emoji = () => (
	<Button onClick={action("clicked1")}>hello storybook2</Button>
);