'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { index, indexTwo } from './algoliaIndex';

let resultList: any[];

function SearchLayer() {
	const [pop, setPop] = useState(false);
	const [query, setQuery] = useState<string>('');
	const [results, setResults] = useState<any[]>([]);

	useEffect(() => {
		const search = async () => {
			if (query.trim() !== '') {
				try {
					// Perform search query on both indices
					const [result1, result2] = await Promise.all([
						index.search(query),
						indexTwo.search(query),
					]);

					// Combine the results from both indices
					const combinedResults = [...result1.hits, ...result2.hits];
					setResults(combinedResults);
				} catch (error) {
					console.error('Error performing search:', error);
				}
			} else {
				setResults([]);
			}
		};

		search();
	}, [query]);
	return (
		<div>
			{pop && (
				<div className="fixed left-0 top-0 z-[9999] h-screen w-screen overflow-clip">
					<div className="relative pt-16">
						<div
							className="absolute left-0 top-0 h-screen w-screen bg-black opacity-80	 backdrop-blur-md"
							onClick={() => {
								setPop(false);
							}}
						></div>
						<div className="relative mx-auto w-5/6 rounded-lg bg-white p-10 drop-shadow-lg md:w-1/2">
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search..."
								className="h-16 w-full outline-none "
								autoFocus={true}
							/>
							<div className="flex flex-col space-y-3">
								{results.map((hit, idx) => (
									<div
										key={hit.objectID}
										className="flex justify-start border-t   border-gray-500 align-middle"
									>
										<div className="py-3">
											<h6 className="mb-2 text-base font-semibold">{hit.title}</h6>
											<p className="mb-3 text-xs">{hit.brief}</p>
											{hit.objectID.length > 12 ? (
												<Link
													href={hit.url}
													target="_blank"
													className="flex w-fit gap-2 bg-blue-600 px-6 py-1
                 text-xs text-white"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-journal-bookmark-fill"
														viewBox="0 0 16 16"
													>
														<path
															fillRule="evenodd"
															d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
														/>
														<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
														<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
													</svg>
													<span> Read Articles</span>
												</Link>
											) : (
												<Link
													href={hit.url}
													target="_blank"
													className="flex w-fit gap-2
                 bg-red-600 px-6 py-1 text-xs  text-white"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-youtube"
														viewBox="0 0 16 16"
													>
														<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
													</svg>
													<span> watch video</span>
												</Link>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="border-black/15 mt-6 hidden w-32 rounded-md border lg:mt-0 lg:w-28 xl:flex">
				<input
					onClick={() => setPop(true)}
					placeholder="search..."
					className="ml-5 h-8 w-16 text-[0.75rem]
           text-black  outline-none"
				/>
				<CiSearch className="mt-2" size={16} />
			</div>
			<div className="block w-fit xl:hidden" onClick={() => setPop(true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-search"
					viewBox="0 0 16 16"
				>
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
				</svg>
			</div>
		</div>
	);
}

export default SearchLayer;
