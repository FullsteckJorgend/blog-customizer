import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontSizeOptions,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import useDetectClickOutSideComponent from 'src/castomHooks/useDetectClickOutSideComponent';

type Props = {
	articleState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onApply }: Props) => {
	const [draftState, setDraftState] = useState(articleState);
	const { ref, isComponentVisible, setIsComponentVisible } =
		useDetectClickOutSideComponent(false);

	const updateArticleState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setDraftState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton
				isOpen={isComponentVisible}
				onClick={() => setIsComponentVisible(!isComponentVisible)}
			/>
			<aside
				ref={ref}
				className={clsx(
					styles.container,
					isComponentVisible && styles.container_open
				)}>
				<form className={styles.form}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value: OptionType) => {
							updateArticleState('fontFamilyOption', value);
						}}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={draftState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value: OptionType) => {
							updateArticleState('fontSizeOption', value);
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={draftState.fontColor}
						options={fontColors}
						onChange={(value: OptionType) => {
							updateArticleState('fontColor', value);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={draftState.backgroundColor}
						options={backgroundColors}
						onChange={(value: OptionType) => {
							updateArticleState('backgroundColor', value);
						}}
					/>
					<Select
						title='Ширина контента'
						selected={draftState.contentWidth}
						options={contentWidthArr}
						onChange={(value: OptionType) => {
							updateArticleState('contentWidth', value);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								onApply(defaultArticleState);
								setDraftState(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={() => onApply(draftState)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
