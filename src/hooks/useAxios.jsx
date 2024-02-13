import axios from 'axios';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import { useAuth } from './useAuth';
import { useStorage } from './useStorage';

export const useAxios = () => {
	const { getSession } = useStorage();
	const { push } = useRouter();
	const { setSession } = useAuth();

	const axiosClient = () => {
		const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_URLAPI })

		axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
		axiosInstance.defaults.headers.common["Authorization"] ="Bearer " + getSession("accessToken");

		return axiosInstance;
	}

	const refreshToken = () => {
		return new Promise((res, rej) => {
			const url = process.env.NEXT_PUBLIC_URLAPI + 'oauth/refresh';
			const config = { headers: { 'Authorization': 'Bearer ' + getSession('refreshToken') } }

			getSession('refreshToken') && custom()
				.post(url, {}, config)
				.then(({ data }) => { setSession(data); res(data); })
				.catch(ex => {
					swal({
						title: 'Error',
						text: 'Your session is expired or logged in another device',
						icon: 'error'
					}).then(() => { rej(ex); push('/logout'); })
				});
		})
	}

	const get = (url, body=null) => {
		return new Promise((res, rej) => {
			axiosClient()
				.get(url, {
					params:body,
				})
				.then(response => {
					res(response);
				})
				.catch(ex => {
					if (ex.response?.status === 401 || ex.response?.status === 403) {
						refreshToken()
							.then(() => {
								axiosClient()
									.get(url)
									.then(response => {
										res(response);
									})
									.catch(ex => rej(ex));
							})
							.catch(ex => rej(ex));
					}
					else rej(ex);
				});
		})
	}

	const post = (url, data, alert) => {
		return new Promise((res, rej) => {
			axiosClient()
				.post(url, data)
				.then(response => {
					res(response);
					!!alert && success();
				})
				.catch(ex => {
					if (ex.response?.status === 401 || ex.response?.status === 403) {
						refreshToken()
							.then(() => {
								axiosClient()
									.post(url, data)
									.then(response => {
										res(response);
										if(alert == true){
											!!alert && success();
										}
									})
									.catch(ex => {
										rej(ex);
										error();
									});
							})
							.catch(ex => {
								rej(ex);
								error();
							});
					}
					else {
						rej(ex);
						error();
					}
				});
		})
	}

	const put = (url, data) => {
		return new Promise((res, rej) => {
			axiosClient()
				.put(url, data)
				.then(response => {
					res(response);
					success();
				})
				.catch(ex => {
					if (ex.response?.status === 401 || ex.response?.status === 403) {
						refreshToken()
							.then(() => {
								axiosClient()
									.put(url, data)
									.then(response => {
										res(response);
										success();
									})
									.catch(ex => {
										rej(ex);
										error();
									});
							})
							.catch(ex => {
								rej(ex);
								error();
							});
					}
					else {
						rej(ex);
						error();
					};
				});
		})
	}

	const custom = () => axios.create({ baseURL: process.env.NEXT_PUBLIC_URLAPI });

	const success = () => {
		swal({
			title: 'success',
			icon: 'success'
		})
	}

	const error = () => {
		swal({
			title: 'Error',
			icon: 'error',
			text: 'Something goes wrong!'
		});
	}

	return {
		axiosClient,
		get,
		post,
		put,
		custom
	}
}
