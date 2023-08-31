type DataResponseEntity<TData> = {
  message?: string
  statusCode?: number
} & TData

type DtoHttpResponse<TData> = {
  statusCode: number
  message: string
} & Omit<DataResponseEntity<TData>, 'message' | 'statusCode'>

class HttpResponse {
  /**
   * Base Response
   * @param dataResponse
   * @returns
   */
  private static baseResponse<TData>(
    dataResponse: DataResponseEntity<TData>
  ): DtoHttpResponse<TData> {
    const {
      message = 'data has been received',
      statusCode = 200,
      ...rest
    } = dataResponse

    return { statusCode, message, ...rest }
  }

  /**
   * Response Get or Sucess
   * @param dataResponse
   * @param options
   * @returns
   */
  public static get<TData>(
    dataResponse: DataResponseEntity<TData>
  ): DtoHttpResponse<TData> {
    const message = 'success.data_received'

    return this.baseResponse({ message, ...dataResponse })
  }

  /**
   * Response Created
   * @param dataResponse
   * @param options
   * @returns
   */
  public static created<TData>(
    dataResponse: DataResponseEntity<TData>
  ): DtoHttpResponse<TData> {
    const message = 'success.data_added'

    return this.baseResponse({ statusCode: 201, message, ...dataResponse })
  }

  /**
   * Response Updated
   * @param dataResponse
   * @param options
   * @returns
   */
  public static updated<TData>(
    dataResponse: DataResponseEntity<TData>
  ): DtoHttpResponse<TData> {
    const message = 'success.data_updated'

    return this.baseResponse({ message, ...dataResponse })
  }

  /**
   * Response Deleted
   * @param dataResponse
   * @param options
   * @returns
   */
  public static deleted<TData>(
    dataResponse: DataResponseEntity<TData>
  ): DtoHttpResponse<TData> {
    const message = 'success.data_deleted'

    return this.baseResponse({ message, ...dataResponse })
  }
}

export default HttpResponse
